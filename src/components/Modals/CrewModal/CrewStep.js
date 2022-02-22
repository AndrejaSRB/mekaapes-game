import PropTypes from "prop-types";
// ******** Component ********
import CrewStepApe from './CrewStepApe';
// ******** Styles ********
import { Crew, Meka, RoboList, Robo } from "./CrewModal.styles";


// Todo implement creating Crew
const CrewStep = ({ clickedMeka, clickedRobos }) => {
  const renderRobos = () => {
    if (clickedRobos?.length > 0) {
      return clickedRobos.map((robo) => (
        <Robo key={robo.id}>
          {/* <img src={robo.img} alt={robo.id} /> */}
          <CrewStepApe ape={robo} />
        </Robo>
      ));
    }
  };

  return (
    <Crew>
      <Meka>
        {/* <img src={clickedMeka?.img} alt={clickedMeka?.id} /> */}
        <CrewStepApe ape={clickedMeka} />
      </Meka>
      <RoboList length={clickedRobos?.length ? clickedRobos.length : 0}>
        {renderRobos()}
        {clickedRobos?.length > 0}
      </RoboList>
    </Crew>
  );
};

export default CrewStep;
CrewStep.propTypes = {
  clickedMeka: PropTypes.object.isRequired,
  clickedRobos: PropTypes.array,
};
