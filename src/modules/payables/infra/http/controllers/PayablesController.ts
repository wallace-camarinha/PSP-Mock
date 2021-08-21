import ListAllPayablesService from '@modules/payables/services/ListAllPayablesService';
import ListOnePayablesService from '@modules/payables/services/ListOnePayableService';
import PayableDashService from '@modules/payables/services/PayableDashService';
import { Request, Response } from 'express';

const listAllPayablesService = new ListAllPayablesService();
const listOnePayablesService = new ListOnePayablesService();
const payableDashService = new PayableDashService();

export default class PayablesController {
  public async listOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const payable = await listOnePayablesService.execute(id);

    return res.json(payable);
  }

  public async listAll(req: Request, res: Response): Promise<Response> {
    const { merchant_id } = req.body;
    const payables = await listAllPayablesService.execute(merchant_id);

    return res.json(payables);
  }

  public async payablesDash(req: Request, res: Response): Promise<Response> {
    const { merchant_id } = req.body;
    const payableDash = await payableDashService.execute(merchant_id);

    return res.json(payableDash);
  }
}
