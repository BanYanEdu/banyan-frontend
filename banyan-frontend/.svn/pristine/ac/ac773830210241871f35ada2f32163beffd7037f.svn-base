import { OnDestroy } from '@angular/core';
export declare class LoadingIndicatorService implements OnDestroy {
    static instance: LoadingIndicatorService;
    elementId: string;
    private static loadingIndicator;
    constructor();
    setElementId(elementId: string): void;
    getElementId(): string;
    /**
     * Get DOM of loading indicator
     */
    private getIndicator;
    private getLoadingIndicator;
    showLoading(message?: string): void;
    hideLoading(): void;
    complete(): void;
    ngOnDestroy(): void;
}
export declare class LoadingIndicator {
    container: HTMLElement;
    element: HTMLElement;
    message: string;
    constructor(container: HTMLElement, el: HTMLElement, msg?: string);
}
