interface IProps {
  width: string;
  height: string;
}

const OrderThumbnail: React.FC<IProps> = ({ width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 54 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="53.7014"
        height="52"
        rx="2"
        fill="#BDBDBD"
        fillOpacity="0.25"
      />
      <ellipse cx="26.4669" cy="25.6284" rx="13.4253" ry="13" fill="#FC8139" />
      <path
        d="M33.5156 25.6282L22.9432 31.5388L22.9432 19.7176L33.5156 25.6282Z"
        fill="white"
      />
    </svg>
  );
};

export default OrderThumbnail;
