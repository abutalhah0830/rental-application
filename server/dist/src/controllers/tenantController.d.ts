import { Request, Response } from 'express';
type CognitoParams = {
    cognitoId: string;
};
export declare const getTenant: (req: Request<CognitoParams>, res: Response) => Promise<void>;
export declare const createTenant: (req: Request, res: Response) => Promise<void>;
export declare const updateTenant: (req: Request<CognitoParams>, res: Response) => Promise<void>;
export declare const getCurrentResidences: (req: Request<CognitoParams>, res: Response) => Promise<void>;
type FavoriteParams = {
    cognitoId: string;
    propertyId: string;
};
export declare const addFavoriteProperty: (req: Request<FavoriteParams>, res: Response) => Promise<void>;
export declare const removeFavoriteProperty: (req: Request<FavoriteParams>, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=tenantController.d.ts.map