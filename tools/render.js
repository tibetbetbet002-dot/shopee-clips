// เรนเดอร์คลิปจาก timeline.json -> MP4 แนวตั้ง 1080x1920
// ใช้: node render.js <โฟลเดอร์คลิป> [--stills 1,5,9]
const fs = require('fs'), path = require('path'), { spawn, execSync } = require('child_process');
const { pathToFileURL } = require('url');
const puppeteer = require('puppeteer-core');

const FPS = 30;
// หาเบราว์เซอร์: Windows (Edge/Chrome) หรือ Linux บนคลาวด์ (Chrome ที่ setup_cloud.sh ติดตั้ง)
function findBrowser() {
  const c = [process.env.CHROME_PATH,
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser'].filter(Boolean);
  const hit = c.find(p => fs.existsSync(p));
  if (hit) return hit;
  const cache = path.join(__dirname, '.chrome');  // npx @puppeteer/browsers install chrome@stable --path tools/.chrome
  if (fs.existsSync(cache)) {
    const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
    const exe = walk(cache).find(p => /chrome-linux64[\\/]chrome$|chrome\.exe$/.test(p));
    if (exe) return exe;
  }
  throw new Error('ไม่พบเบราว์เซอร์ Chrome/Edge — รัน tools/setup_cloud.sh ก่อน');
}
const PY = process.env.PYTHON || (process.platform === 'win32' ? 'python' : 'python3');
const FF = execSync(`${PY} -c "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())"`).toString().trim();

(async () => {
  const dir = path.resolve(process.argv[2]);
  const si = process.argv.indexOf('--stills');
  const tl = JSON.parse(fs.readFileSync(path.join(dir, 'timeline.json'), 'utf8'));
  const browser = await puppeteer.launch({
    executablePath: findBrowser(), headless: true,
    args: ['--allow-file-access-from-files', '--disable-web-security', '--no-sandbox', '--disable-dev-shm-usage'],
  });
  const page = await browser.newPage();
  page.on('pageerror', e => console.error('PAGE ERROR', e.message));
  page.on('console', m => { if (m.type() === 'error') console.error('CONSOLE', m.text()); });
  await page.setViewport({ width: 1080, height: 1920 });
  await page.goto(pathToFileURL(path.join(__dirname, 'core.html')).href);
  const epUrl = pathToFileURL(path.join(dir, 'scenes.js')).href + '?v=' + Date.now();
  await page.evaluate((t, u) => window.init(t, u), tl, epUrl);
  const frame = (t, q) => page.evaluate((t, q) => { window.draw(t); return document.getElementById('cv').toDataURL('image/jpeg', q); }, t, q)
    .then(u => Buffer.from(u.split(',')[1], 'base64'));

  if (si > 0) {
    const sd = path.join(dir, 'stills'); fs.mkdirSync(sd, { recursive: true });
    for (const t of process.argv[si + 1].split(',').map(Number)) {
      fs.writeFileSync(path.join(sd, `t${t.toFixed(2)}.jpg`), await frame(t, 0.85));
    }
    await browser.close(); console.log('stills ->', sd); return;
  }

  const out = path.join(dir, path.basename(dir) + '.mp4');
  const ff = spawn(FF, ['-loglevel', 'error', '-y', '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', String(FPS), '-i', '-',
    '-i', path.join(dir, 'audio.wav'), '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p',
    '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-ar', '48000', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const n = Math.ceil(tl.total * FPS);
  for (let i = 0; i < n; i++) {
    const buf = await frame(i / FPS, 0.93);
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (i % 90 === 0) process.stdout.write(`\r${i}/${n}`);
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  await browser.close();
  console.log('\nเสร็จ ->', out);
})();
