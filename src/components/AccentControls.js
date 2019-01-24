import React, { Component } from 'react';

import Div from '../elements/Div';
import Button from '../elements/Button';
import Form from '../elements/Form';
import Input from '../elements/Input';
import Icon from '../elements/Icon';

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
        <Button
          onClick={this.onAccentToggleButtonClick}
          fontSize="1.5em"
          textAlign="left"
        >
          accent
          <Icon className="material-icons" float="right">
            {this.props.accent ? 'toggle_on' : 'toggle_off'}
          </Icon>
        </Button>

        <Button
          noBorder
          value={-1}
          onClick={this.onIncrementAccentBeatButtonClick}
          fontSize="1.5rem"
        >
          <Icon className="material-icons">remove</Icon>
        </Button>

        <Form onSubmit={this.onAccentBeatInputFormSubmit}>
          <Input
            ref={this.props.accentBeatInputRef}
            value={this.props.accentBeatInput}
            onChange={this.onAccentBeatInputChange}
            onFocus={this.onAccentBeatInputFocus}
            onBlur={this.onAccentBeatInputBlur}
            fontSize="3rem"
            noBorder
          />
        </Form>

        <Button
          noBorder
          value={1}
          onClick={this.onIncrementAccentBeatButtonClick}
          fontSize="1.5rem"
        >
          <Icon className="material-icons">add</Icon>
        </Button>
      </Div>
    );
  }
}

export default AccentControls;
