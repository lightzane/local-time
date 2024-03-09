import { Signal } from 'solid-js';
import { months } from '../shared/utils/date.util';
import { OcticonX } from './icons';

type Props = {
  toggle: Signal<boolean>;
  onFormatClick: (format: string) => void;
};

export function Modal(props: Props) {
  const [open, setOpen] = props.toggle;

  const now = new Date();
  const m = months[now.getMonth()];
  const d = now.getDate();

  function toggleModal() {
    setOpen((o) => !o);
  }

  function handleFormatClick(format: string) {
    props.onFormatClick(format);
    toggleModal();
  }

  return (
    <div
      class='absolute rounded-lg bg-dracula-dark/80 shadow-lg inset-x-0 p-4 flex flex-col gap-y-3 bg-opacity-50 backdrop-blur-md'
      classList={{
        'animate-enter': open(),
        'opacity-0 pointer-events-none': !open(),
      }}>
      <header class='flex items-center justify-between'>
        <span class='text-sm text-dracula-light/60'>Other formats</span>
        <div class='text-dracula-light/50'>
          <button
            type='button'
            class='hover:text-dracula-light'
            onClick={toggleModal}>
            <OcticonX />
          </button>
        </div>
      </header>
      <ul class='space-y-3 px-5 text-sm text-dracula-cyan'>
        <li>
          <span
            class='cursor-pointer hover:underline'
            onClick={() => handleFormatClick(`${m} ${d}, 12am PDT`)}>
            {m} {d}, 12am PDT
          </span>
        </li>
        <li>
          <span
            class='cursor-pointer hover:underline'
            onClick={() => handleFormatClick(`${m} ${d}, 00:00 PDT`)}>
            {m} {d}, 00:00 PDT
          </span>
        </li>
        <li>
          <span
            class='cursor-pointer hover:underline'
            onClick={() => handleFormatClick(`${m} ${d}, 12am UTC-8`)}>
            {m} {d}, 12am UTC-8
          </span>
        </li>
      </ul>
    </div>
  );
}
