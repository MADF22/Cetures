
declare module 'flickity' {
    interface FlickityOptions {
      cellAlign?: 'left' | 'center' | 'right';
      contain?: boolean;
      groupCells?: number | boolean;
      pageDots?: boolean;
      prevNextButtons?: boolean;
      wrapAround?: boolean;
      autoPlay?: boolean | number;
      arrowShape?: string | { x0: number, x1: number, y1: number, x2: number, y2: number, x3: number };
    }
  
    class Flickity {
      constructor(element: Element | string, options?: FlickityOptions);
      reloadCells(): void;
      resize(): void;
      destroy(): void;
      next(): void;
      previous(): void;
    }
    
    export default Flickity;
  }