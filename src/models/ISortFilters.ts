export type ISortFilterType = "disabled" | "up" | "down";

export type ISortFilters = {
	status: ISortFilterType;
	email: ISortFilterType;
	username: ISortFilterType;
};

export type ISearchQuery = ISortFilters & { page: string | number };
