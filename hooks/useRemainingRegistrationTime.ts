import React from 'react';

interface RemainingRegistrationTimeProps {
  registerStart: number;
  registerEnd: number;
}

interface IRemainingTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const initValue: IRemainingTime = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

const useRemainingRegistrationTime = ({
  registerStart,
  registerEnd,
}: RemainingRegistrationTimeProps) => {
  const [remainingTime, setRemainingTime] = React.useState<IRemainingTime>(initValue);

  React.useEffect(() => {
    const calculateRemainingTime = () => {
      const timeDifference = registerEnd - registerStart;

      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setRemainingTime({ days, hours, minutes, seconds });
      } else {
        setRemainingTime(null);
      }
    };

    const timer = setInterval(calculateRemainingTime, 1000);

    return () => clearInterval(timer);
  }, [registerEnd]);

  return remainingTime;
};

export default useRemainingRegistrationTime;
