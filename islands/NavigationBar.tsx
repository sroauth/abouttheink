import type { Signal } from "@preact/signals";

interface NavigationBarProps {
  index: Signal<number>;
}

export default function NavigationBar(props: NavigationBarProps) {
  const titles = ["Home", "Current Status"];

  return (
    <div class="navigation-bar">
      {titles[props.index.value]}
    </div>
  );
}
