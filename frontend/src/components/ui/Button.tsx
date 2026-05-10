export interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: React.ComponentType<{ size?: number }>;
  onClick?: () => void;
}

const sizeStyles: Record<ButtonProps["size"], string> = {
  sm: "px-2 py-1.5 text-sm",
  md: "px-4 py-1.5 text-base",
  lg: "px-4 py-1.5 text-lg",
};

const iconSize: Record<ButtonProps["size"], number> = {
  sm: 18,
  md: 20,
  lg: 22,
};

const variants: Record<ButtonProps["variant"], string> = {
  primary: "bg-indigo-600 text-white",
  secondary: "bg-indigo-100 text-indigo-600",
};

const defaultStyles = "rounded-lg flex items-center gap-2 ";

export const Button = (props: ButtonProps) => {
  const StartIcon = props.startIcon;

  return (
    <button
      className={`${sizeStyles[props.size]} ${defaultStyles} ${variants[props.variant]}`}
      onClick={props.onClick}
    >
      {StartIcon && <StartIcon size={iconSize[props.size]} />}

      {props.text}
    </button>
  );
};
