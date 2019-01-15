import React, { Component } from 'react';
import Div from '../elements/Div';
import Button from '../elements/Button';
import Form from '../elements/Form';
import Input from '../elements/Input';

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
      <Div>
        <Button onClick={this.onAccentToggleButtonClick} fontSize={'1.5em'}>
          Accent: {this.props.accent ? 'On' : 'Off'}
        </Button>

        <Button
          noBorder
          value={-1}
          onClick={this.onIncrementAccentBeatButtonClick}
          fontSize={'1.5rem'}
        >
          <i className="fa fa-minus" />
        </Button>

        <Form onSubmit={this.onAccentBeatInputFormSubmit}>
          <Input
            ref={this.props.accentBeatInputRef}
            value={this.props.accentBeatInput}
            onChange={this.onAccentBeatInputChange}
            onFocus={this.onAccentBeatInputFocus}
            onBlur={this.onAccentBeatInputBlur}
            fontSize={'3rem'}
            noBorder
          />
        </Form>

        <Button
          noBorder
          value={1}
          onClick={this.onIncrementAccentBeatButtonClick}
          fontSize={'1.5rem'}
        >
          <i className="fa fa-plus" />
        </Button>
      </Div>
    );
  }
}

export default AccentControls;
