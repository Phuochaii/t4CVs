function GradientFill() {
  return (
    <svg display="block" width="24" height="24">
      <linearGradient
        id="gradient"
        x1="100%"
        y1="100%"
        x2="0%"
        y2="0%"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#10b981" offset="40%" />
        <stop stopColor="#06b6d4" offset="60%" />
      </linearGradient>
    </svg>
  );
}

export default GradientFill;
