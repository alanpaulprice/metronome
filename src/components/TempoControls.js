import React, { Component, Fragment } from 'react';
import Div from '../elements/Div';
import Button from '../elements/Button';
import Form from '../elements/Form';
import Input from '../elements/Input';
import TapTempo from './TapTempo';

class TempoControls extends Component {
  // if the value isn't a valid bpm, do nothing
  // blur (triggering input value update) after state has been updated
  onTempoInputFormSubmit = async e => {
    e.preventDefault();
    const newTempo = parseInt(this.props.tempoInput);
    if (!this.props.legalTempoValue(newTempo)) return;
    await this.props.setTempo(newTempo);
    document.activeElement.blur();
  };

  // only allows 3 digits to be entered
  onTempoInputChange = e =>
    this.props.setTempoInput(
      e.currentTarget.value.replace(/\D/g, '').slice(0, 3)
    );

  onTempoInputFocus = () => this.props.setTempoInput('');

  onTempoInputBlur = () => this.props.setTempoInput(this.props.tempo);

  onIncrementTempoButtonClick = e =>
    this.props.incrementTempo(parseInt(e.currentTarget.value));

  onTempoSliderChange = e =>
    this.props.setTempo(parseInt(e.currentTarget.value));

  render() {
    return (
      <Fragment>
        <Form onSubmit={this.onTempoInputFormSubmit}>
          <Input
            ref={this.props.tempoInputRef}
            value={this.props.tempoInput}
            onChange={this.onTempoInputChange}
            onFocus={this.onTempoInputFocus}
            onBlur={this.onTempoInputBlur}
            fontSize={'3rem'}
            noBorder
          />
        </Form>

        <Div>
          <Button
            noBorder
            value={-1}
            onClick={this.onIncrementTempoButtonClick}
            fontSize={'1.5rem'}
          >
            <i className="fa fa-minus" />
          </Button>

          <Input
            type={'range'}
            min={this.props.MIN_TEMPO}
            max={this.props.MAX_TEMPO}
            step={1}
            value={this.props.tempo}
            onChange={this.onTempoSliderChange}
          />

          <Button
            noBorder
            value={1}
            onClick={this.onIncrementTempoButtonClick}
            fontSize={'1.5rem'}
          >
            <i className="fa fa-plus" />
          </Button>
        </Div>

        <TapTempo
          setTempo={this.props.setTempo}
          ref={this.props.tapTempoButtonRef}
        />
      </Fragment>
    );
  }
}

export default TempoControls;
