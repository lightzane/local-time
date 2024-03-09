import { Show, createEffect, createSignal, onCleanup } from 'solid-js';
import { OcticonClock, OcticonLocation } from './components/icons';
import { Modal } from './components/modal';
import { TimeRegexUtil } from './shared/utils';
import { DateUtil } from './shared/utils/date.util';
import { TimeZoneUtil } from './shared/utils/time-zone.util';
import { TimeZoneValidator } from './shared/validators';
import { Clock } from './components/clock';

export default function App() {
  const toggle = createSignal(false);

  const [output, setOutput] = createSignal('');
  const [error, setError] = createSignal('');
  const [today, setToday] = createSignal(DateUtil.format(new Date()));
  const [outputTime, setOutputTime] = createSignal(0); // output to seconds

  let inputRef!: HTMLInputElement;
  let interval: ReturnType<typeof setInterval>;

  createEffect(() => {
    interval = setInterval(() => {
      setToday(DateUtil.format(new Date()));
    }, 1000);

    onCleanup(() => {
      clearInterval(interval);
    });
  });

  function handleEnter(e: KeyboardEvent) {
    if (e.code === 'Enter') {
      inputRef.blur();
      handleTimeConvert();
    }
  }

  function handleShowOtherFormats(e: MouseEvent) {
    e.preventDefault();
    toggle[1](true); // show the modal
  }

  /** A format has been pressed from the modal */
  function handleFormat(format: string) {
    inputRef.value = format;
    inputRef.focus();
    setOutput('');
    setError('');
  }

  function handleTimeConvert(): void {
    const input = inputRef.value.trim();

    setError('');
    setOutput('');

    const date = new Date();

    let output = '';
    let error = '';

    const hasDate = TimeRegexUtil.monthDay(input);

    // Add comma if missing
    if (hasDate && !input.includes(',')) {
      inputRef.value = input
        .replace(new RegExp(`(${hasDate})`), '$1,')
        .toUpperCase();
    }

    const validated = TimeZoneValidator.validate(input, date.getFullYear());

    error = validated.match(/not supported|invalid/i) ? ' error' : '';

    if (error) {
      setError(validated);
      return;
    }

    try {
      output = TimeZoneUtil.getLocalTime(input, date);
    } catch (err) {
      // @ts-ignore
      error = err.message;
    }

    if (output) {
      inputRef.value = validated;
      setOutput(output);

      const outputISOString = TimeZoneUtil.getLocalTime(input, date, true);
      const inSeconds = Math.floor(new Date(outputISOString).getTime() / 1000);

      setOutputTime(inSeconds);
    }

    if (error) {
      setError(error);
    }

    setToday(DateUtil.format(new Date()));
  }

  function getCountdownLink(): string {
    return `https://lightzane.github.io/countdown/#/?t=${outputTime()}`;
  }

  function handleCopy(
    e: MouseEvent & {
      currentTarget: HTMLAnchorElement;
    },
  ): void {
    e.preventDefault();

    const copy = getCountdownLink();

    if ('clipboard' in navigator) {
      navigator.clipboard.writeText(copy);
    }

    setTimeout(() => {
      window.open(copy, '_blank');
    });
  }

  return (
    <main class='relative flex items-center justify-center h-full mx-auto max-w-xs'>
      <div class='w-full'>
        <div class='flex items-center justify-center pb-5'>
          <Clock />
        </div>

        {/* Today */}
        <Show when={today()}>
          <div class='font-mono text-center pb-5 text-sm animate-enter'>
            {today()}
          </div>
        </Show>

        <label
          for='local-time'
          class='text-sm font-medium leading-6 text-dracula-light/80 ... flex items-center justify-between'>
          <span>Get local time</span>
          <div class='p-1 cursor-pointer' onClick={handleShowOtherFormats}>
            <span class='text-dracula-cyan hover:underline'>other formats</span>
          </div>
        </label>

        {/* Input */}
        <div class='mt-2'>
          <div class='flex rounded-lg bg-dracula-purple/10 shadow-sm ring-1 ring-inset ring-dracula-purple/80 focus-within:ring-2 focus-within:ring-inset focus-within:ring-dracula-purple sm:max-w-md'>
            <span
              class='flex select-none items-center pl-3 text-dracula-light/80 sm:text-sm'
              onClick={() => inputRef.focus()}>
              <OcticonClock />
            </span>
            <input
              id='local-time'
              ref={inputRef}
              type='text'
              placeholder='12am PDT'
              class='block flex-1 border-0 bg-transparent py-1.5 pl-3 text-dracula-light placeholder:text-gray-500 focus:ring-0 sm:text-sm sm:leading-6'
              onKeyPress={handleEnter}
              autocomplete='off'
              value='12am PDT'
              onKeyDown={() => {
                setOutput('');
                setError('');
              }}
            />
          </div>
        </div>

        {/* Output */}
        <div class='leading-6 mt-2 text-sm '>
          <Show when={!output() && !error()}>
            {/* <p class='text-dracula-light/50'>
              This will be converted to your local time.
            </p> */}
            <button
              type='button'
              class='rounded-lg py-2 bg-dracula-purple font-semibold text-sm w-full animate-enter'
              onClick={handleTimeConvert}>
              <span class='text-dracula-darker'>Convert</span>
            </button>
          </Show>

          <Show when={output()}>
            <p class='leading-6 text-dracula-cyan hover:underline'>
              <a
                class='text-base inline-flex items-center space-x-2 pl-3'
                target='_blank'
                href={getCountdownLink()}
                onClick={(e) => handleCopy(e)}>
                <OcticonLocation />
                <span class='pl-1'>{output()}</span>
              </a>
            </p>
            {/* <a
              class='hover:text-dracula-cyan hover:underline dark:text-gray-300 dark:hover:text-sky-300 pl-1'
              target='_blank'
              href={getCountdownLink()}
              onClick={(e) => handleCopy(e)}>
              Click to see countdown and copy URL
            </a> */}
          </Show>

          <Show when={error()}>
            <p class='text-dracula-red'>{error()}</p>
          </Show>
        </div>
      </div>
      <Modal toggle={toggle} onFormatClick={handleFormat} />
    </main>
  );
}
