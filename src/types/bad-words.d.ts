declare module 'bad-words' {
    export default class Filter {
      constructor(options?: {
        emptyList?: boolean;
        list?: string[];
        placeHolder?: string;
        regex?: string | RegExp;
        replaceRegex?: string | RegExp;
      });
  
      addWords(...words: string[]): void;
      removeWords(...words: string[]): void;
      clean(text: string): string;
      isProfane(text: string): boolean;
    }
  }
  