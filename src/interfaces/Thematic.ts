export default interface ThematicInterface {
    id: string,
    pid: number,
    name: string,
    children?: ThematicInterface[]
}