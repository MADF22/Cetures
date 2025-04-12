// types/flickity.d.ts
declare module 'flickity' {
    interface FlickityOptions {
      cellAlign?: 'left' | 'center' | 'right';
      contain?: boolean;
      groupCells?: number | boolean | string;
      pageDots?: boolean;
      prevNextButtons?: boolean;
      wrapAround?: boolean;
      autoPlay?: boolean | number;
      arrowShape?: string | { 
        x0: number;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        x3: number;
      };
      draggable?: boolean;
      freeScroll?: boolean;
      initialIndex?: number;
    }
  
    interface FlickityEvents {
      (event: 'change', listener: (index: number) => void): void;
      (event: 'select', listener: (index: number) => void): void;
      (event: 'settle', listener: (index: number) => void): void;
    }
  
    class Flickity {
      constructor(element: Element | string, options?: FlickityOptions);
      
      // Methods
      reloadCells(): void;
      resize(): void;
      destroy(): void;
      next(animate?: boolean): void;
      previous(animate?: boolean): void;
      select(index: number, animate?: boolean, isWrapped?: boolean): void;
      off(event: string, listener: (...args: any[]) => void): void;
      on: FlickityEvents;
      
      // Properties
      selectedIndex: number;
      cells: Element[];
      slider: HTMLElement;
    }
  
    export default Flickity;
  }