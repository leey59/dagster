import {useCallback} from 'react';
import styled from 'styled-components';

import {RunGraphQueryItem} from './toGraphQueryItems';
import {
  ganttChartSelectionSyntaxSupportedAttributes,
  useGanttChartSelectionAutoCompleteProvider,
} from './useGanttChartSelectionAutoCompleteProvider';
import {isUnmatchedValueQuery} from '../asset-selection/isUnmatchedValueQuery';
import {parseRunSelectionQuery} from '../run-selection/AntlrRunSelection';
import {RunSelectionLexer} from '../run-selection/generated/RunSelectionLexer';
import {RunSelectionParser} from '../run-selection/generated/RunSelectionParser';
import {InputDiv, SelectionAutoCompleteInput} from '../selection/SelectionInput';
import {createSelectionLinter} from '../selection/createSelectionLinter';
import {weakMapMemoize} from '../util/weakMapMemoize';

export const GanttChartSelectionInput = ({
  items,
  value,
  onChange: _onChange,
}: {
  items: RunGraphQueryItem[];
  value: string;
  onChange: (value: string) => void;
}) => {
  const onChange = useCallback(
    (value: string) => {
      if (parseRunSelectionQuery([], value) instanceof Error && isUnmatchedValueQuery(value)) {
        _onChange(`name:"*${value}*"`);
      } else {
        _onChange(value);
      }
    },
    [_onChange],
  );

  return (
    <Wrapper>
      <SelectionAutoCompleteInput
        id="run-gantt-chart"
        useAutoComplete={useGanttChartSelectionAutoCompleteProvider(items).useAutoComplete}
        placeholder="Search and filter steps"
        linter={getLinter()}
        value={value}
        onChange={onChange}
      />
    </Wrapper>
  );
};
const getLinter = weakMapMemoize(() =>
  createSelectionLinter({
    Lexer: RunSelectionLexer,
    Parser: RunSelectionParser,
    supportedAttributes: ganttChartSelectionSyntaxSupportedAttributes,
  }),
);

const Wrapper = styled.div`
  ${InputDiv} {
    width: 24vw;
  }
`;
