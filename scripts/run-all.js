import { spawn } from 'node:child_process';
import process from 'node:process';

console.log('================================================================');
console.log('  🔬 Starting FORENSICA LIMS — Backend & Frontend in parallel   ');
console.log('================================================================\n');

const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';

// 1. Launch Backend Server (Port 5000)
const backend = spawn('node', ['server/server.js'], {
  stdio: 'inherit',
  shell: true
});

// 2. Launch Frontend Dev Server (Vite - Port 5173)
const frontend = spawn(npmCmd, ['run', 'dev'], {
  stdio: 'inherit',
  shell: true
});

function cleanup() {
  console.log('\n🛑 Shutting down FORENSICA processes...');
  try { backend.kill(); } catch (e) {}
  try { frontend.kill(); } catch (e) {}
  process.exit(0);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
