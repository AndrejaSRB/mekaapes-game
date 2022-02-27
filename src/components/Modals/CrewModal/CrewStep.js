import PropTypes from "prop-types";
// ******** Component ********
import CrewStepApe from './CrewStepApe';
// ******** Styles ********
import { Crew, Meka, RoboList, Robo } from "./CrewModal.styles";


const CrewStep = ({ clickedMeka, clickedRobos }) => {
  const renderRobos = () => {
    if (clickedRobos?.length > 0) {
      return clickedRobos.map((robo) => (
        <Robo key={robo.id}>
          <CrewStepApe ape={robo} />
        </Robo>
      ));
    }
  };

  return (
    <Crew>
      <Meka>
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
