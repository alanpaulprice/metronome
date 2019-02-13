import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Div from '../elements/Div';
import Button from '../elements/Button';
import Form from '../elements/Form';
import Input from '../elements/Input';
import Icon from '../elements/Icon';

class TimeSigBeatsControls extends Component {
  // blur (triggering input value update) after state has been updated
  onTimeSigBeatsInputFormSubmit = async e => {
    e.preventDefault();
    await this.props.setTimeSigBeats(this.props.timeSigBeatsInput);
    document.activeElement.blur();
  };

  // only allows 2 digits to be entered
  onTimeSigBeatsInputChange = e =>
    this.props.setTimeSigBeatsInput(
      e.currentTarget.value.replace(/\D/g, '').slice(0, 2)
    );

  onTimeSigBeatsInputFocus = () => this.props.setTimeSigBeatsInput('');

  // if the input isn't already displaying the current timeSigBeats, update input
  onTimeSigBeatsInputBlur = () =>
    String(this.props.timeSigBeats) !== this.props.timeSigBeatsInput &&
    this.props.setTimeSigBeatsInput(String(this.props.timeSigBeats));

  onIncrementTimeSigBeatsButtonClick = e =>
    this.props.incrementTimeSigBeats(e.currentTarget.value);

  render() {
    return (
      <Div display="flex" justifyContent="space-around" alignItems="center">
        <Button
          value={-1}
          onClick={this.onIncrementTimeSigBeatsButtonClick}
          border="none"
          scaleOnActive
        >
          <Icon className="material-icons" fontSize="2.5rem">
            remove
          </Icon>
        </Button>

        <Form onSubmit={this.onTimeSigBeatsInputFormSubmit} flex="1 1 0">
          <Input
            ref={this.props.timeSigBeatsInputRef}
            value={this.props.timeSigBeatsInput}
            onChange={this.onTimeSigBeatsInputChange}
            onFocus={this.onTimeSigBeatsInputFocus}
            onBlur={this.onTimeSigBeatsInputBlur}
            width="9.375rem"
            maxWidth="5rem"
            fontSize="3.75rem"
            border="none"
          />
        </Form>

        <Button
          value={1}
          onClick={this.onIncrementTimeSigBeatsButtonClick}
          border="none"
          scaleOnActive
        >
          <Icon className="material-icons" fontSize="2.5rem">
            add
          </Icon>
        </Button>
      </Div>
    );
  }
}

TimeSigBeatsControls.propTypes = {
  timeSigBeats: PropTypes.number.isRequired,
  timeSigBeatsInput: PropTypes.string.isRequired,
  setTimeSigBeats: PropTypes.func.isRequired,
  setTimeSigBeatsInput: PropTypes.func.isRequired,
  incrementTimeSigBeats: PropTypes.func.isRequired,
  MIN_TIME_SIG_BEATS: PropTypes.number.isRequired,
  MAX_TIME_SIG_BEATS: PropTypes.number.isRequired,
  timeSigBeatsInputRef: PropTypes.shape({
    current: PropTypes.object
  }).isRequired
};

export default TimeSigBeatsControls;
