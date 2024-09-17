import "./Button.css"

export type ButtonProps = {
  className?: string;
  children?: any;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export default function Button({ className, onClick, children }: ButtonProps) {
  return (
    <button 
      className={`button ${className ?? ""}`} 
      onClick={onClick}
    >
      {children ?? undefined}
    </button>
  )
}
