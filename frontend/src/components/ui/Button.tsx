export interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: React.ComponentType<{ size?: number }>;
  onClick?: () => void;
}

const sizeStyles = {
  sm: "px-2  py-1.5 text-sm",
  md: "px-4  py-1.5 text-md",
  lg: "px-4  py-1.5 text-lg",
};

const iconSize = {
  sm: 20,
  md: 22,
  lg: 24,
};

const variants = {
  primary: "bg-indigo-600 text-white",
  secondary: "bg-indigo-100 text-indigo-600",
};

export const Button = (props: ButtonProps) => {
  const StartIcon = props.startIcon;

  return (
    <button
      className={`${sizeStyles[props.size]} rounded-lg flex justify-around items-center gap-1 ${variants[props.variant]}`}
      onClick={props.onClick}
    >
      {StartIcon && <StartIcon size={iconSize[props.size]} />}

      {props.text}
    </button>
  );
};
