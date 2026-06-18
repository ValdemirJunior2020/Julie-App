type LogoProps = {
  compact?: boolean;
};

export function Logo({ compact = false }: LogoProps) {
  return (
    <a className="logo" href="#home" aria-label="Julie Caroline home">
      <span className="logoMark" aria-hidden="true">JC</span>
      {!compact && (
        <span className="logoText">
          <strong>Julie Sutherland</strong>
          <small>Marketing Strategist</small>
        </span>
      )}
    </a>
  );
}
