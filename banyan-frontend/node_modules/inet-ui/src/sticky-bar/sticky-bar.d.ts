export declare class StickyBar {
    private temp;
    private sensor;
    private fixed;
    private preventResize;
    container: HTMLElement;
    scroller: HTMLElement;
    bar: HTMLElement;
    topSpace: number;
    bottomSpace: number;
    constructor(options: StickyBarOptions);
    init(options: StickyBarOptions): void;
    onScroll(): void;
    destroy(): void;
    private resizeDimension;
    private getHeightBar;
    private setFixed;
    private isFixed;
    private clearFixed;
    private resetBarCss;
    private setCssBar;
}
export interface StickyBarOptions {
    bar: HTMLElement;
    scroller?: HTMLElement;
    container?: HTMLElement;
    topSpace?: number;
    bottomSpace?: number;
}
