export const getLevelText = (level) => {
    console.log('level', level);
  switch (level) {
    case 0:
      return (
        <>
          <li>Position: Scarp Scour</li>
          <li>Produce 1,000 $OG per day</li>
        </>
      );
    case 1:
      return (
        <>
          <li>Position: Garbage Compactor</li>
          <li>Produce 1,250 $OG per day (25% more)</li>
          <li>Decrease the risk of $OG getting stolen to 25% when unstaking</li>
        </>
      );
    case 2:
      return (
        <>
          <li>Position: Factory Worker</li>
          <li>Produce 1,500 $OG per day (50% more)</li>
          <li>Decrease the unstaking time by 25%</li>
        </>
      );
    case 3:
      return (
        <>
          <li>Position: Executive Bot</li>
          <li>Produce 2,000 $OG per day (100% more)</li>
        </>
      );
    default:
      break;
  }
};
