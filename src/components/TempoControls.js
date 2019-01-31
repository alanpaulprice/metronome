import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import TapTempoButton from './TapTempoButton';
import Div from '../elements/Div';
import Button from '../elements/Button';
import Form from '../elements/Form';
import Input from '../elements/Input';
import Icon from '../elements/Icon';

class TempoControls extends Component {
  // if the value isn't valid, use closest valid value
  // blur (triggering input value update) after state has been updated
  onTempoInputFormSubmit = async e => {
    e.preventDefault();
    let newTempo = parseInt(this.props.tempoInput);
    if (newTempo < this.props.MIN_TEMPO) newTempo = this.props.MIN_TEMPO;
    if (newTempo > this.props.MAX_TEMPO) newTempo = this.props.MAX_TEMPO;
    await this.props.setTempo(newTempo);
    document.activeElement.blur();
  };

  // only allows 3 digits to be entered
  onTempoInputChange = e =>
    this.props.setTempoInput(
      e.currentTarget.value.replace(/\D/g, '').slice(0, 3)
    );

  onTempoInputFocus = () => this.props.setTempoInput('');

  // if the input isn't already displaying the current tempo, update input
  onTempoInputBlur = () =>
    String(this.props.tempo) !== this.props.tempoInput &&
    this.props.setTempoInput(String(this.props.tempo));

  onIncrementTempoButtonClick = e =>
    this.props.incrementTempo(parseInt(e.currentTarget.value));

  onTempoSliderChange = e =>
    this.props.setTempo(parseInt(e.currentTarget.value));

  // if tempo doesn't match the tempoInput, and tempoInput doesn't have focus,
  // set the tempoInput to tempo
  componentDidUpdate() {
    if (
      String(this.props.tempo) !== this.props.tempoInput &&
      document.activeElement !== this.props.tempoInputRef.current
    )
      this.props.setTempoInput(String(this.props.tempo));
  }

  render() {
    return (
      <Fragment>
        <Div width="100%">
          <Div display="flex" justifyContent="center">
            <Button
              border="none"
              value={-1}
              onClick={this.onIncrementTempoButtonClick}
              fontSize="1.5rem"
            >
              <Icon className="material-icons" fontSize="4rem" fontWeight="900">
                remove
              </Icon>
            </Button>

            <Form onSubmit={this.onTempoInputFormSubmit}>
              <Input
                ref={this.props.tempoInputRef}
                value={this.props.tempoInput}
                onChange={this.onTempoInputChange}
                onFocus={this.onTempoInputFocus}
                onBlur={this.onTempoInputBlur}
                width="10rem"
                margin="5rem"
                fontSize="5rem"
                border="none"
              />
            </Form>

            <Button
              border="none"
              value={1}
              onClick={this.onIncrementTempoButtonClick}
              fontSize="1.5rem"
            >
              <Icon className="material-icons" fontSize="4rem" fontWeight="900">
                add
              </Icon>
            </Button>
          </Div>

          <Input
            type="range"
            min={this.props.MIN_TEMPO}
            max={this.props.MAX_TEMPO}
            step={1}
            value={this.props.tempo}
            onChange={this.onTempoSliderChange}
            width="100%"
          />
        </Div>

        <TapTempoButton
          setTempo={this.props.setTempo}
          ref={this.props.tapTempoButtonRef}
        />
      </Fragment>
    );
  }
}

TempoControls.propTypes = {
  tempo: PropTypes.number.isRequired,
  tempoInput: PropTypes.string.isRequired,
  setTempo: PropTypes.func.isRequired,
  setTempoInput: PropTypes.func.isRequired,
  incrementTempo: PropTypes.func.isRequired,
  legalTempoValue: PropTypes.func.isRequired,
  MIN_TEMPO: PropTypes.number.isRequired,
  MAX_TEMPO: PropTypes.number.isRequired,
  tempoInputRef: PropTypes.shape({
    current: PropTypes.object
  }).isRequired,
  tapTempoButtonRef: PropTypes.shape({
    current: PropTypes.object
  }).isRequired
};

export default TempoControls;
