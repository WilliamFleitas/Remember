import { ImportanceLevelType } from '@/src/app/globalTypes/globalTypes'

interface ImportanceLevelPropsType {
  importance_level: ImportanceLevelType
}

const formatedLevel = {
  One: {
    label: 'Vague',
    color: '#000740'
  },
  Two: {
    label: 'Useful',
    color: '#8f065d'
  },
  Three: {
    label: 'Interesting',
    color: '#bf4702'
  },
  Four: {
    label: "DON'T FORGET",
    color: '#940108'
  },
  Five: {
    label: "DON'T NEVER EVER FORGET",
    color: '#660005'
  }
}
export default function ImportanceLevel ({
  importance_level
}: ImportanceLevelPropsType): React.JSX.Element {
  return (
    <small
      className={` text-lg px-2 py-1 rounded-md font-bold uppercase`}
      style={{
        backgroundColor: formatedLevel[importance_level].color
      }}
    >
      {formatedLevel[importance_level].label}
    </small>
  )
}
