import ListAllPayablesService from '@modules/payables/services/ListAllPayablesService';
import ListOnePayablesService from '@modules/payables/services/ListOnePayableService';
import PayableDashService from '@modules/payables/services/PayablesDashService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class PayablesController {
  public async listOne(req: Request, res: Response): Promise<Response> {
    const listOnePayablesService = container.resolve(ListOnePayablesService);

    const { id } = req.params;
    const payable = await listOnePayablesService.execute(id);

    return res.json(payable);
  }

  public async listAll(req: Request, res: Response): Promise<Response> {
    const listAllPayablesService = container.resolve(ListAllPayablesService);

    const { merchant_id } = req.body;
    const payables = await listAllPayablesService.execute(merchant_id);

    return res.json(payables);
  }

  public async payablesDash(req: Request, res: Response): Promise<Response> {
    const payableDashService = container.resolve(PayableDashService);

    const { merchant_id } = req.body;
    const payableDash = await payableDashService.execute(merchant_id);

    return res.json(payableDash);
  }
}
