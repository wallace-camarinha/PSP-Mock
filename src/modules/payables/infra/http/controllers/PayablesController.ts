import ListAllPayablesService from '@modules/payables/services/ListAllPayablesService';
import ListOnePayablesService from '@modules/payables/services/ListOnePayableService';
import { Request, Response } from 'express';

const listAllPayablesService = new ListAllPayablesService();
const listOnePayablesService = new ListOnePayablesService();

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
}
