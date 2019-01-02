import React, { Component } from 'react';
import Wrapper from '../elements/Wrapper';
import Button from '../elements/Button';

class AccentControls extends Component {
  onAccentToggleButtonClick = () => this.props.toggleAccent();

  // if the value isn't a valid accent beat, do nothing
  // blur (triggering input value update) after state has been updated
  onAccentBeatInputFormSubmit = async e => {
    e.preventDefault();
    const newAccentBeat = parseInt(this.props.accentBeatInput);
    if (!this.props.legalAccentBeatValue(newAccentBeat)) return;
    await this.props.setAccentBeat(newAccentBeat);
    document.activeElement.blur();
  };

  // only allows 2 digits to be entered
  onAccentBeatInputChange = e =>
    this.props.setAccentBeatInput(
      e.currentTarget.value.replace(/\D/g, '').slice(0, 2)
    );

  onAccentBeatInputFocus = () => this.props.setAccentBeatInput('');

  onAccentBeatInputBlur = () =>
    this.props.setAccentBeatInput(this.props.accentBeat);

  onIncrementAccentBeatButtonClick = e =>
    this.props.incrementAccentBeat(parseInt(e.currentTarget.value));

  render() {
    return (
      <Wrapper>
        <Button onClick={this.onAccentToggleButtonClick}>
          {this.props.accent ? 'On' : 'Off'}
        </Button>
        <Button
          noBorder
          value={-1}
          onClick={this.onIncrementAccentBeatButtonClick}
        >
          <i className="fa fa-minus" />
        </Button>
        <form onSubmit={this.onAccentBeatInputFormSubmit}>
          <input
            ref={this.props.accentBeatInputRef}
            value={this.props.accentBeatInput}
            onChange={this.onAccentBeatInputChange}
            onFocus={this.onAccentBeatInputFocus}
            onBlur={this.onAccentBeatInputBlur}
          />
        </form>
        <Button
          noBorder
          value={1}
          onClick={this.onIncrementAccentBeatButtonClick}
        >
          <i className="fa fa-plus" />
        </Button>
      </Wrapper>
    );
  }
}

export default AccentControls;
