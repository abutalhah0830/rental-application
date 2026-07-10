import { Request, Response } from 'express';
type CognitoParams = {
    cognitoId: string;
};
export declare const getManager: (req: Request<CognitoParams>, res: Response) => Promise<void>;
export declare const createManager: (req: Request, res: Response) => Promise<void>;
export declare const updateManager: (req: Request<CognitoParams>, res: Response) => Promise<void>;
export declare const getManagerProperties: (req: Request<CognitoParams>, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=managerController.d.ts.map