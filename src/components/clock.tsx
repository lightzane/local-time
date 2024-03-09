// @ts-nocheck

import './clock.css';

export function Clock() {
  document.addEventListener('DOMContentLoaded', () => {
    const hh = document.getElementById('hh');
    const mm = document.getElementById('mm');
    const ss = document.getElementById('ss');

    const dh = document.querySelector('.dots.hours');
    const dm = document.querySelector('.dots.minutes');
    const ds = document.querySelector('.dots.seconds');

    const _h = document.getElementById('h_h');
    const _m = document.getElementById('h_m');
    const _s = document.getElementById('h_s');

    function tick() {
      const today = new Date();
      const h = today.getHours();
      const m = today.getMinutes();
      const s = today.getSeconds();

      hh.style.strokeDashoffset = 503 - (503 * h) / 12; // 503 - see clock.css | 12 - 12hrs clock
      mm.style.strokeDashoffset = 629 - (629 * m) / 60; // 629 - see clock.css | 60 - 60min clock
      ss.style.strokeDashoffset = 754 - (754 * s) / 60; // 754 - see clock.css | 60 - 60sec clock

      dh.style.transform = `rotateZ(${h * 30}deg)`; // 360 / 12 = 30
      dm.style.transform = `rotateZ(${m * 6}deg)`; // 360 / 60 = 6
      ds.style.transform = `rotateZ(${s * 6}deg)`; // 360 / 60 = 6

      _h.style.transform = `rotateZ(${h * 30}deg)`;
      _m.style.transform = `rotateZ(${m * 6}deg)`;
      _s.style.transform = `rotateZ(${s * 6}deg)`;
    }

    tick();

    setInterval(tick, 1000);
  });

  return (
    <div class='clock opacity-0 animate-enter pointer-events-none'>
      <div id='time'>
        {/* Circle */}
        <div class='circle seconds' style='--stroke: var(--dracula-pink)'>
          <div class='dots seconds'></div>
          <svg>
            <circle id='ss' cx='120' cy='120' r='120'></circle>
          </svg>
        </div>
        <div class='circle minutes' style='--stroke: var(--dracula-yellow)'>
          <div class='dots minutes'></div>
          <svg>
            <circle id='mm' cx='100' cy='100' r='100'></circle>
          </svg>
        </div>
        <div class='circle hours' style='--stroke: var(--dracula-green)'>
          <div class='dots hours'></div>
          <svg>
            <circle id='hh' cx='80' cy='80' r='80'></circle>
          </svg>
        </div>

        {/* Hands */}
        <div id='h_s' class='hands' style='--line: var(--dracula-pink)'>
          <i></i>
        </div>
        <div id='h_m' class='hands' style='--line: var(--dracula-yellow)'>
          <i></i>
        </div>
        <div id='h_h' class='hands' style='--line: var(--dracula-green)'>
          <i></i>
        </div>

        {/* Numbers */}
        <span style='--i: 1'>
          <b>1</b>
        </span>
        <span style='--i: 2'>
          <b>2</b>
        </span>
        <span style='--i: 3'>
          <b>3</b>
        </span>
        <span style='--i: 4'>
          <b>4</b>
        </span>
        <span style='--i: 5'>
          <b>5</b>
        </span>
        <span style='--i: 6'>
          <b>6</b>
        </span>
        <span style='--i: 7'>
          <b>7</b>
        </span>
        <span style='--i: 8'>
          <b>8</b>
        </span>
        <span style='--i: 9'>
          <b>9</b>
        </span>
        <span style='--i: 10'>
          <b>10</b>
        </span>
        <span style='--i: 11'>
          <b>11</b>
        </span>
        <span style='--i: 12'>
          <b>12</b>
        </span>
      </div>
    </div>
  );
}
