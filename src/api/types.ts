/**
 * EventData
 */
export interface EventData {
    _embedded: Embedded;
    _links: EventDataLinks;
    ageRestrictions: AgeRestrictions;
    classifications: EventDataClassification[];
    dates: Dates;
    doorsTimes: DoorsTimes;
    id: string;
    images: EventDataImage[];
    info: string;
    locale: string;
    name: string;
    nameOrigin: string;
    pleaseNote: string;
    promoter: PurplePromoter;
    promoters: PromoterElement[];
    sales: Sales;
    seatmap: Seatmap;
    test: boolean;
    ticketing: Ticketing;
    ticketLimit: TicketLimit;
    type: string;
    url: string;
}

export interface Embedded {
    attractions: EmbeddedAttraction[];
    venues: EmbeddedVenue[];
}

export interface EmbeddedAttraction {
    _links: AttractionLinks;
    classifications: AttractionClassification[];
    id: string;
    images: AttractionImage[];
    locale: string;
    name: string;
    test: boolean;
    type: string;
    upcomingEvents: AttractionUpcomingEvents;
    url: string;
}

export interface AttractionLinks {
    self: PurpleSelf;
}

export interface PurpleSelf {
    href: string;
}

export interface AttractionClassification {
    family: boolean;
    genre: PurpleGenre;
    primary: boolean;
    segment: PurpleSegment;
    subGenre: PurpleSubGenre;
    subType: PurpleSubType;
    type: PurpleType;
}

export interface PurpleGenre {
    id: string;
    name: string;
}

export interface PurpleSegment {
    id: string;
    name: string;
}

export interface PurpleSubGenre {
    id: string;
    name: string;
}

export interface PurpleSubType {
    id: string;
    name: string;
}

export interface PurpleType {
    id: string;
    name: string;
}

export interface AttractionImage {
    fallback: boolean;
    height: number;
    ratio: string;
    url: string;
    width: number;
}

export interface AttractionUpcomingEvents {
    _filtered: number;
    _total: number;
    ticketmaster: number;
}

export interface EmbeddedVenue {
    _links?: VenueLinks;
    address?: Address;
    city?: City;
    country?: Country;
    dmas?: Dma[];
    generalInfo?: GeneralInfo;
    id?: string;
    images?: VenueImage[];
    locale?: string;
    location?: Location;
    markets?: Market[];
    name?: string;
    parkingDetail?: string;
    postalCode?: string;
    state?: State;
    test?: boolean;
    timezone?: string;
    type?: string;
    upcomingEvents?: VenueUpcomingEvents;
    url?: string;
}

export interface VenueLinks {
    self: FluffySelf;
}

export interface FluffySelf {
    href: string;
}

export interface Address {
    line1: string;
}

export interface City {
    name: string;
}

export interface Country {
    countryCode: string;
    name: string;
}

export interface Dma {
    id: number;
}

export interface GeneralInfo {
    childRule: string;
    generalRule: string;
}

export interface VenueImage {
    fallback?: boolean;
    height?: number;
    ratio?: string;
    url?: string;
    width?: number;
}

export interface Location {
    latitude: string;
    longitude: string;
}

export interface Market {
    id?: string;
    name?: string;
}

export interface State {
    name: string;
    stateCode: string;
}

export interface VenueUpcomingEvents {
    _filtered: number;
    _total: number;
    ticketmaster: number;
}

export interface EventDataLinks {
    attractions: LinksAttraction[];
    self: TentacledSelf;
    venues: LinksVenue[];
}

export interface LinksAttraction {
    href: string;
}

export interface TentacledSelf {
    href: string;
}

export interface LinksVenue {
    href?: string;
}

export interface AgeRestrictions {
    legalAgeEnforced: boolean;
}

export interface EventDataClassification {
    family?: boolean;
    genre?: FluffyGenre;
    primary?: boolean;
    segment?: FluffySegment;
    subGenre?: FluffySubGenre;
    subType?: FluffySubType;
    type?: FluffyType;
}

export interface FluffyGenre {
    id: string;
    name: string;
}

export interface FluffySegment {
    id: string;
    name: string;
}

export interface FluffySubGenre {
    id: string;
    name: string;
}

export interface FluffySubType {
    id: string;
    name: string;
}

export interface FluffyType {
    id: string;
    name: string;
}

export interface Dates {
    spanMultipleDays: boolean;
    start: Start;
    status: Status;
    timezone: string;
}

export interface Start {
    dateTBA: boolean;
    dateTBD: boolean;
    dateTime: string;
    localDate: string;
    localTime: string;
    noSpecificTime: boolean;
    timeTBA: boolean;
}

export interface Status {
    code: string;
}

export interface DoorsTimes {
    dateTime: string;
    localDate: string;
    localTime: string;
}

export interface EventDataImage {
    fallback: boolean;
    height: number;
    ratio: string;
    url: string;
    width: number;
}

export interface PurplePromoter {
    description: string;
    id: string;
    name: string;
}

export interface PromoterElement {
    description?: string;
    id?: string;
    name?: string;
}

export interface Sales {
    public: Public;
}

export interface Public {
    endDateTime: string;
    startDateTime: string;
    startTBA: boolean;
    startTBD: boolean;
}

export interface Seatmap {
    staticUrl: string;
}

export interface TicketLimit {
    info: string;
}

export interface Ticketing {
    allInclusivePricing: AllInclusivePricing;
    safeTix: SafeTix;
}

export interface AllInclusivePricing {
    enabled: boolean;
}

export interface SafeTix {
    enabled: boolean;
}

/**
 * ArtistInfo
 */
export interface ArtistInfo {
    external_urls: ExternalUrls;
    followers: Followers;
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

export interface ExternalUrls {
    spotify: string;
}

export interface Followers {
    href: null;
    total: number;
}

export interface Image {
    height: number;
    url: string;
    width: number;
}

