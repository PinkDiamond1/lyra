import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import { LyraMarkType, Mark } from '../../store/factory/Mark';
import { Icon } from '../Icon';

const getClosestGroupId = require('../../util/hierarchy').getClosestGroupId;
const addMark = require('../../actions/markActions').addMark;
const assets = require('../../util/assets');

function mapStateToProps(reduxState: State) {
  return {};
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    addMark: (type: LyraMarkType) => {
      const newMarkProps = Mark(type, {
        _parent: getClosestGroupId()
      });
      dispatch(addMark(newMarkProps));
    }
  };
}

// Currently supported mark types
const marksArray = ['rect', 'symbol', 'text', 'line', 'area'];

interface AddMarksToolProps {
  addMark: (type: string) => void;
}

class AddMarksTool extends React.Component<AddMarksToolProps> {

  public classNames: 'new-marks';
  public render() {
    return (
      <ul>
        {marksArray.map(function(markType, i) {
          return (
            <li
              key={markType}
              onClick={this.props.addMark.bind(null, markType)}
            >
              <Icon glyph={assets[markType]} /> {markType}
            </li>
          );
        }, this)}
      </ul>
    );
  }
}

export const AddMarks = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMarksTool);
