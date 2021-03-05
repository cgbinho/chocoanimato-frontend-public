import React, { useEffect } from 'react';
import { useLottie, Lottie } from 'react-lottie-hook';

import { VideoContainer } from './styles';
import Controls from '../Controls';
import Progress from '../Progress';

function LottiePreview({
  project,
  currentSection,
  lottieRef,
  onPlay,
  onPause,
  onStop
}) {
  return (
    <VideoContainer>
      <Lottie
        className="lottie-preview"
        lottieRef={lottieRef}
        style={{ width: '100%', height: '100%' }}
      />
      {/* <img src="../images/template_video.svg" alt="Template Video" /> */}
      <Progress
        currentStep={project.sections[currentSection]}
        steps={project.sections}
      />
      <Controls onPlay={onPlay} onPause={onPause} onStop={onStop} />
      <hr />
    </VideoContainer>
  );
}

export default LottiePreview;
