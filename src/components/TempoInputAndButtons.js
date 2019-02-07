import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Div from '../elements/Div';
import Button from '../elements/Button';
import Form from '../elements/Form';
import Input from '../elements/Input';
import Icon from '../elements/Icon';

class TempoInputAndButtons extends Component {
  // if the value isn't valid, use closest valid value
  // blur (triggering input value update) after state has been updated
  onTempoInputFormSubmit = async e => {
    e.preventDefault();
    await this.props.setTempo(this.props.tempoInput);
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
    this.props.incrementTempo(e.currentTarget.value);

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
      <Div
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        marginTop="5rem"
      >
        <Button
          value={-1}
          onClick={this.onIncrementTempoButtonClick}
          border="none"
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
            width="12.5rem"
            fontSize="5rem"
            border="none"
          />
        </Form>

        <Button
          value={1}
          onClick={this.onIncrementTempoButtonClick}
          border="none"
        >
          <Icon className="material-icons" fontSize="4rem" fontWeight="900">
            add
          </Icon>
        </Button>
      </Div>
    );
  }
}

TempoInputAndButtons.propTypes = {
  tempo: PropTypes.number.isRequired,
  tempoInput: PropTypes.string.isRequired,
  setTempo: PropTypes.func.isRequired,
  setTempoInput: PropTypes.func.isRequired,
  incrementTempo: PropTypes.func.isRequired,
  MIN_TEMPO: PropTypes.number.isRequired,
  MAX_TEMPO: PropTypes.number.isRequired,
  tempoInputRef: PropTypes.shape({
    current: PropTypes.object
  }).isRequired
};

export default TempoInputAndButtons;
