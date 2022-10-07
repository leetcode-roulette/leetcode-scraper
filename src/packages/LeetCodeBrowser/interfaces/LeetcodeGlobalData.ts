export interface LeetcodeGlobalData {
	feature: GlobalDataFeature;
	streakCounter: number | null;
	currentTimestamp: number;
	userStatus: GlobalDataUserStatus;
	siteRegion: string;
	chinaHost: string;
	websocketUrl: string;
	recaptchaKey: string;
	recaptchaKeyV2: string;
	sitewideAnnouncement: any;
	userCountryCode: string;
}

interface GlobalDataFeature {
	questionTranslation: boolean;
	subscription: boolean;
	signUp: boolean;
	discuss: boolean;
	mockInterview: boolean;
	contest: boolean;
	store: boolean;
	chinaProblemDiscuss: boolean;
	socialProviders: string;
	studentFooter: boolean;
	enableChannels: boolean;
	dangerZone: boolean;
	enableSharedWorker: boolean;
	enableRecaptchaV3: boolean;
	enableDebugger: boolean;
	enableDebuggerPremium: boolean;
	enableAutocomplete: boolean;
	enableAutocompletePremium: boolean;
	enableAllQuestionsRaw: boolean;
	autocompleteLanguages: string;
	enableIndiaPricing: boolean;
	enableReferralDiscount: boolean;
	maxTimeTravelTicketCount: number;
	enableStoreShippingForm: boolean;
	enableCodingChallengeV2: boolean;
	__typename: string;
}

interface GlobalDataUserStatus {
	isSignedIn: boolean;
	isAdmin: boolean;
	isStaff: boolean;
	isSuperuser: boolean;
	isMockUser: boolean;
	isTranslator: boolean;
	isPremium: boolean | null;
	isVerified: boolean;
	checkedInToday: boolean;
	username: string;
	realName: string | null;
	avatar: string | null;
	optedIn: boolean;
	requestRegion: string;
	region: null;
	activeSessionId: number;
	permissions: string[];
	notificationStatus: null;
	completedFeatureGuides: string[];
	__typename: string;
}
