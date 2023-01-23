import Grid from "./Grid"

export default function GridRow({
    item,
    row,
    grid,
    setGrid
}) {

    return <>
        <div className='flex'>
            {item.map((item, col) =>
                <Grid key={col} item={item} row={row} col={col} grid={grid} setGrid={setGrid} />
            )}
        </div>
    </>
}