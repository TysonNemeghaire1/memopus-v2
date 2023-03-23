export default interface Thematic {
    id: string,
    pid: number,
    name: string,
    children?: Thematic[]
}