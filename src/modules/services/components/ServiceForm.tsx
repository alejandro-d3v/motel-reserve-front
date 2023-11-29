import { useState } from "react";

import AppFormModal from "../../../shared/components/Modal/AppFormModal";

import { ServiceDto } from "../dtos/service.dto";

import { CreateOrUpdateServiceService } from "../services/createOrUpdateService.service";

const createOrUpdateServiceService = new CreateOrUpdateServiceService();

interface AppFormModalProps {
  onClose: () => void;
  data: ServiceDto | null;
}

export default function ServiceForm ({ onClose, data }: AppFormModalProps) {
  const [name, setName] = useState<string>(data?.name ?? '');
  const [file, setFile] = useState<any>(null);
  const [urlImg, setUrlImg] = useState<string | any>(data?.urlImg ?? null);
  const [status, setStatus] = useState<number>(data?.status ?? 1);
  const [price, setPrice] = useState<number | any>(data?.price ?? null);
  const [description, setDescription] = useState<string>(data?.description ?? '');
  const [longDescription , setLongDescription] = useState<string>(data?.longDescription ?? '');
  const [advancePayment, setAdvancePayment] = useState<number | any>(data?.advancePayment ?? null);

  const save = async () => {
    try {
      setStatus(1);
      setUrlImg(data?.urlImg ?? null);

      const dataSend: any = { 
        name, 
        // file,
        price,
        status,
        description,
        advancePayment,
        longDescription,
      };

      if (file) dataSend.file = file;
      if (urlImg) dataSend.urlImg = urlImg;

      await createOrUpdateServiceService.run(dataSend, data?.id);
    } catch (e) {
      console.log('err', e);
    }
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    console.log('file', file);

    if (file) setFile(file);
  };

  return (
    <AppFormModal
      onClose={ onClose }
      title={ !data ? 'Nuevo Servicio' : 'Editar Servicio' }
      content={
        <div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Nombre</span>
            </label>

            <input 
              type="text" 
              className="input input-bordered w-full"
              value={ name }
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex space-x-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Precio por hora</span>
              </label>

              <input 
                type="number" 
                className="input input-bordered w-full"
                value={ price }
                onChange={(e) => setPrice(e.target.value as any)}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Cuota Mínima</span>
              </label>

              <input 
                type="number" 
                className="input input-bordered w-full"
                value={ advancePayment }
                onChange={(e) => setAdvancePayment(e.target.value as any)}
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Descripción</span>
            </label>

            <textarea 
              className="textarea textarea-bordered h-14"
              value={ description }
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Más detalles del servicio</span>
            </label>

            <textarea 
              className="textarea textarea-bordered h-14"
              value={ longDescription }
              onChange={(e) => setLongDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Imagen</span>
            </label>

            <input 
              type="file" 
              className="file-input w-full"
              onChange={handleFileChange}
            />
          </div>
        </div>
      }
      actions={
        <button id="btnSave" className="btn btn-neutral" onClick={async () => { await save(); onClose(); }}>Guardar</button>
      }
    />
  );
}