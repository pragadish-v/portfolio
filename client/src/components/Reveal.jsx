import useReveal from '../hooks/useReveal';

/** Scroll-reveal wrapper: fades/slides children in when they enter the viewport. */
export default function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const ref = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
