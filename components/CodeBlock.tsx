type Tok = React.ReactNode;
const C = ({ children }: { children: Tok }) => (
  <span className="text-muted-2 italic">{children}</span>
);
const K = ({ children }: { children: Tok }) => (
  <span className="text-[#7ee0e3]">{children}</span>
);
const F = ({ children }: { children: Tok }) => (
  <span className="text-[#ffe5b4]">{children}</span>
);
const N = ({ children }: { children: Tok }) => (
  <span className="text-[#ffaf7a]">{children}</span>
);
const V = ({ children }: { children: Tok }) => (
  <span className="text-[#cba6ff]">{children}</span>
);

function Line({ n, children }: { n: number; children?: Tok }) {
  return (
    <div className="flex gap-5">
      <span className="text-muted-2/60 select-none w-5 text-right">{n}</span>
      <span className="flex-1 text-surface">{children}&nbsp;</span>
    </div>
  );
}

export default function CodeBlock() {
  return (
    <div className="bg-ink text-surface border border-white/10">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </div>
          <span className="text-xs text-muted-2 font-mono">blink.ino</span>
        </div>
        <span className="hidden sm:inline text-[10px] text-muted-2 font-mono uppercase tracking-[0.18em]">
          Arduino IDE
        </span>
      </div>
      <pre className="font-mono text-[11px] sm:text-[13px] md:text-sm leading-7 p-4 sm:p-5 md:p-6 overflow-x-auto">
        <Line n={1}>
          <C>{`// Blink — el "hola mundo" de Arduino`}</C>
        </Line>
        <Line n={2} />
        <Line n={3}>
          <K>void</K> <F>setup</F>() {"{"}
        </Line>
        <Line n={4}>
          {"  "}
          <F>pinMode</F>(<N>13</N>, <V>OUTPUT</V>);
        </Line>
        <Line n={5}>{"}"}</Line>
        <Line n={6} />
        <Line n={7}>
          <K>void</K> <F>loop</F>() {"{"}
        </Line>
        <Line n={8}>
          {"  "}
          <F>digitalWrite</F>(<N>13</N>, <V>HIGH</V>); <C>{"// LED encendido"}</C>
        </Line>
        <Line n={9}>
          {"  "}
          <F>delay</F>(<N>1000</N>); <C>{"// espera 1 segundo"}</C>
        </Line>
        <Line n={10}>
          {"  "}
          <F>digitalWrite</F>(<N>13</N>, <V>LOW</V>); <C>{"// LED apagado"}</C>
        </Line>
        <Line n={11}>
          {"  "}
          <F>delay</F>(<N>1000</N>);
        </Line>
        <Line n={12}>{"}"}</Line>
      </pre>
    </div>
  );
}
