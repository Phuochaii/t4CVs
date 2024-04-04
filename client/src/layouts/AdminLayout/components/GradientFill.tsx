function GradientFill() {
  return (
    <svg display="block" width="0" height="0">
      <linearGradient
        id="gradient"
        x1="100%"
        y1="100%"
        x2="0%"
        y2="0%"
      >
        <stop stopColor="#ec4899" offset="40%" />
        <stop stopColor="#a855f7" offset="80%" />
      </linearGradient>
    </svg>
  );
}

export default GradientFill;
