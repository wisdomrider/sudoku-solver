import './Grid.css';


export default function Grid({
    row,
    col,
    setGrid,
    item
}) {
    return (
        <input
            onKeyDown={(e) => {
                if (((e.target.value + e.key).length > 1 && e.key !== 'Backspace') || e.key === '0') {
                    e.preventDefault()
                }
            }}
            className={`single-grid ${row === 2 || row === 5 ? 'border-bottom' : ''} ${col === 2 || col === 5 ? 'border-right' : ''}`}
            min={1}
            max={9}
            maxLength={1}
            onChange={(e) => setGrid(e.target.value, row, col)}
            value={item}
            type="number"
        />
    )
}