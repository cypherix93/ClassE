// Compiled using typings@0.6.6
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/f1e34355814e30f94e0b80680a6c6863e0b07c32/shortid/shortid.d.ts
// Type definitions for shortid
// Project: https://github.com/dylang/shortid
// Definitions by: Sam Saint-Pettersen <https://github.com/stpettersens>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module "shortid" {
	export function generate(): string;
	export function characters(string: string): string;
	export function isValid(id: any): boolean;
	export function worker(integer: number): void;
	export function seed(float: number): void;
}