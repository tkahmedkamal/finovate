import { Typography } from './ui/typography';

const Logo = () => {
  return (
    <div className="flex-horizontally gap-2">
      <svg
        width="32"
        height="33"
        viewBox="0 0 32 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.20186 24.3181L10.4166 19.1035L14.1878 22.8747L20.2826 16.7799L22.6731 19.1704V12.5037H16.0065L18.397 14.8943L14.1878 19.1035L10.4166 15.3321L3.82208 21.9267C3.0836 20.2699 2.6731 18.4348 2.6731 16.5037C2.6731 9.13994 8.64264 3.17041 16.0065 3.17041C23.3702 3.17041 29.3398 9.13994 29.3398 16.5037C29.3398 23.8676 23.3702 29.8371 16.0065 29.8371C11.5615 29.8371 7.62451 27.662 5.20186 24.3181Z"
          fill="none"
          className="fill-primary"
        />
      </svg>
      <Typography variant="h3" weight="semibold">
        Finovate.
      </Typography>
    </div>
  );
};

export default Logo;
