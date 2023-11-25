const VOWELS = ['a', 'e', 'i', 'o', 'u', 'á', 'é', 'í', 'ó', 'ú'];
const LENITABLE_CONSONANTS = ['b', 'c', 'd', 'f', 'g', 'm', 'p', 's', 't'];
const NON_LENITABLE_CLUSTERS = ['p', 't', 'c', 'h'];

const ECLIPSIS: any = {
    'b': 'm',
    'c': 'g',
    'd': 'n',
    'f': 'bh',
    'g': 'n',
    'p': 'b',
    't': 'd'
};

const POWERS_OF_THOUSAND = ['', 'míle', 'milliún', 'billiún'];

export function lenite(s: string): string {
    const firstLetter = s[0];
    if (NON_LENITABLE_CLUSTERS.includes(s[1])) {
        return s;
    }

    if (LENITABLE_CONSONANTS.includes(firstLetter.toLocaleLowerCase())) {
        return firstLetter + "h" + s.slice(1);
    }

    return s;
}

export function dontMutate(s: string): string {
    return s;
}
    
export function eclipse(s: string): string {
    const firstLetter = s[0];
    if (VOWELS.includes(firstLetter.toLocaleLowerCase())) {
        return 'n-' + s;
    }

    if (ECLIPSIS[firstLetter]) {
        return ECLIPSIS[firstLetter] + s;
    }

    return s;
}

export function hPrefix(s: string): string {
    if (VOWELS.includes(s[0].toLocaleLowerCase())) {
        return 'h' + s;
    }

    return s;
}

export function listDigits(n: number): number[] {
    let string = n.toString();
    let list: number[] = [];
    for (let digit of string) {
        list.push(Number(digit));
    }
    return list;
}

interface NumberForm {
    plain: string,
    counting: string,
    tens: string,
    mutation: (s: string) => (string),
}

// I think the counting forms mutate slightly differently with normal nouns
// and with céad and míle, but I'll just use the number rules for now
const numberForms: NumberForm[] = [
    {plain: "", counting: "", tens: "", mutation: dontMutate}, 
    {plain: "a haon", counting: "", tens: "a deich", mutation: dontMutate}, 
    {plain: "a dó", counting: "dhá", tens: "fiche", mutation: lenite},
    {plain: "a trí", counting: "trí", tens: "tríocha", mutation: lenite},
    {plain: "a ceathair", counting: "ceithre", tens: "daichead", mutation: lenite},
    {plain: "a cúig", counting: "cúig", tens: "caoga", mutation: lenite},
    {plain: "a sé", counting: "sé", tens: "seasca", mutation: lenite},
    {plain: "a seacht", counting: "seacht", tens: "seachtó", mutation: eclipse},
    {plain: "a hocht", counting: "ocht", tens: "ochtó", mutation: eclipse},
    {plain: "a naoi", counting: "naoi", tens: "nócha", mutation: eclipse},
];

function reverseDigits(n: number): number[] {
    return Array.from(n.toString())
                .map(Number)
                .reverse();
}

type NumberTriplet = number[];

export class Triplet {
    value: number;
    one: number;
    ten: number;
    hundred: number;

    constructor(n: number) {
        this.value = n;

        let digits = reverseDigits(n);
        this.one = digits[0] ?? 0;
        this.ten = digits[1] ?? 0;
        this.hundred = digits[2] ?? 0;
    }

        
    public isNothing(): boolean {
        return this.one == 0 && this.ten == 0 && this.hundred == 0;
    }

    public isZero(): boolean {
        return this.value === 0;
    }

    public hasTeen(): boolean {
        return this.ten == 1 && this.one != 0;
    }

    public hasMultipleOfTen(): boolean {
        return this.ten != 0 && this.one == 0;
    }
}

// TODO: at this point I could probably make this into a class and constructor
function tripletizeNumber(n: number): NumberTriplet[] {
    let digits = reverseDigits(n);
    let triplets: NumberTriplet[] = [];
    for (let i = 0; i < digits.length; i += 3) {
        triplets.push(digits.slice(i, i + 3));
    }
    return triplets;
}

export function tripletizeNew(n: number): Triplet[] {
    let digits = reverseDigits(n);
    let triplets: Triplet[] = [];

    // This feels like a very messy way of doing things
    for (let i = 0; i < digits.length; i += 3) {
        triplets.push(new Triplet(Number(digits.slice(i, i + 3).join())));
    }
    return triplets;
}

function irishForTriplet(n: NumberTriplet, counter?: string): string {
    let text: string;
    if (counter) {
        text = numberForms[n[0]].counting + ' ' + numberForms[n[0]].mutation(counter)
        if (n[0] === 0) { // Multiples of ten
            if ((!(n[0] && n[1] && n[2]) || n[1] == 1) && counter === "míle") {
                text = numberForms[n[1]].tens + ' ' + counter;
                console.log("we're here");
            } else {
                text = numberForms[n[1]].tens + ' is ' + counter;
            }
        } else {
            if (n[1] === 1) { // Teens
                text += (counter === 'míle') ? ' dhéag' : ' déag';
            } else if (n[1]) { // Above Teens (20+)
                console.log("n = ", n)
                if ((!(n[0] && n[1] && n[2]) || n[1] == 1) && counter === "míle") {
                    text = text + ' is ' + numberForms[n[1]].tens;
                } else {
                    text = numberForms[n[1]].tens + ' is ' + text;
                }
            }
    
            if (n[2]) {
                if ((!(n[0] && n[1] && n[2]) || n[1] == 1) && counter === "míle") {
                    text = numberForms[n[2]].counting + ' ' + numberForms[n[2]].mutation('céad') + ' is ' + text;
                } else {
                    text = numberForms[n[2]].counting + ' ' + numberForms[n[2]].mutation('céad') + ' ' + text;
                }
            }
        }
    } else {
        text = numberForms[n[0]].plain ?? '';
        if (n[1] === 1 && n[0] !== 0) { // Teens
            text += (n[0] === 2) ? ' dhéag' : ' déag';
        } 

        else if (n[1]) { // Multiples of 10
            console.log("N1: " + n[1]);
            text = (numberForms[n[1]].tens) + ' ' + text;
        }

        if (n[2]) {
            text = numberForms[n[2]].counting + ' ' + numberForms[n[2]].mutation('céad') + ' ' + text;
        }
    }
    return text;
}

// Currently using Córas na Maoluimhreacha
export function irishForNumber(n: number, useFlatNumberSystem:boolean=false): string {
    let triplets = tripletizeNumber(n);
    let i = 0;
    let text = '';

    if (useFlatNumberSystem) {
        for (let triplet of triplets) {
            console.log('TRIPLET: ' + triplet);
            text = irishForTriplet(triplet) + ' ' + POWERS_OF_THOUSAND[i] + ' ' + text;
            console.log('TEXT: ' + text);
            i += 1;
        }
    } else {
        for (let triplet of triplets) {
            text = irishForTriplet(triplet, POWERS_OF_THOUSAND[i]) + (text.length > 3 ? ', ' : ' ') + text;
            i += 1;
        }
    }

    return text;
}