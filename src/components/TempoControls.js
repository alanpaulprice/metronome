import React, { Component } from 'react';
import Wrapper from '../elements/Wrapper';
import Button from '../elements/Button';

class TempoControls extends Component {
  tempoInputRef = React.createRef();

  // if the value isn't a valid bpm, do nothing
  // blur (triggering input value update) after state has been updated
  onTempoInputFormSubmit = async e => {
    e.preventDefault();
    const newTempo = parseInt(this.props.tempoInput);
    if (!this.props.legalTempoValue(newTempo)) return;
    await this.props.setTempo(newTempo);
    this.tempoInputRef.current.blur();
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

  render() {
    return (
      <Wrapper>
        <Button noBorder value={-1} onClick={this.onIncrementTempoButtonClick}>
          <i className="fa fa-minus" />
        </Button>
        <form onSubmit={this.onTempoInputFormSubmit}>
          <input
            ref={this.tempoInputRef}
            value={this.props.tempoInput}
            onChange={this.onTempoInputChange}
            onFocus={this.onTempoInputFocus}
            onBlur={this.onTempoInputBlur}
          />
        </form>
        <Button noBorder value={1} onClick={this.onIncrementTempoButtonClick}>
          <i className="fa fa-plus" />
        </Button>
      </Wrapper>
    );
  }
}

export default TempoControls;
