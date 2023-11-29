import { useEffect, useState } from "react";

import ServiceForm from "../components/ServiceForm";
import AppLoading from "../../../shared/components/AppLoading";
import AppModal from "../../../shared/components/Modal/AppModal";
import AppEmptyResponse from "../../../shared/components/AppEmptyResponse";
import AppConfirmDeleteModal from "../../../shared/components/Modal/AppConfirmDeleteModal";

import { ServiceDto } from "../dtos/service.dto";

import { GetServicesService } from "../services/getServices.service";
import { DeleteServiceService } from "../services/deleteService.service";

const deleteServiceService = new DeleteServiceService();
const getServicesService = new GetServicesService();

export default function ServicesPage () {
  const [services, setServices] = useState<ServiceDto[] | []>([]);
  const [service, setService] = useState<ServiceDto | null>(null);

  const [deleteModal, setDeleteModal] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRoles = async () => {
      setLoading(true);

      try {
        setServices(await getServicesService.run());
      } catch (e) {
        console.error('err:', e);
        setLoading(false);
      }

      setLoading(false);
    };

    getRoles();
  }, []);

  const openFormModal = (service: ServiceDto | null = null) => {
    setService(service);
    setFormModal(true);
  };
  const closeModalForm = async (d: any = null) => {
    if (!d || d.target.id != 'btnCloseModal') {
      try {
        setServices(await getServicesService.run());
      } catch (e) {
        console.log('err', e);
      }
    }

    setFormModal(false);
    setService(null);
  };

  const openDeleteModal = (service: ServiceDto) => {
    setDeleteModal(true);
    setService(service);
  };
  const closeDeleteModal = async (d: any = null) => {
    if (d.target.id != 'btnCloseModal') {
      if (service) {
        try {
          await deleteServiceService.run(service.id);

          setServices(await getServicesService.run());
        } catch (e) {
          console.log('err', e);
        }
      }
    }

    setDeleteModal(false);
    setService(null);
  };

  return (
    <>
      <div className="px-8 pt-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold mb-0">Servicios</h1>

          <button className="btn btn-neutral" disabled={ loading } onClick={ () => openFormModal() }>
            Agregar Servicio
          </button>
        </div>

        <div className="divider"></div>

        <table className="table">
          <thead>
            <tr>
              <th className="p-3 font-semibold text-left">Nombre</th>
              <th className="p-3 font-semibold text-left max-w-sm">Descripción</th>
              <th className="p-3 font-semibold text-right">Precio</th>
              <th className="p-3 font-semibold text-right">Cuota Mínima</th>
              <th className="p-3 font-semibold text-center">Estado</th>
              <th className="p-3 font-semibold text-center">Opciones</th>
            </tr>
          </thead>

          <tbody>
            {loading ? ( <td colSpan={6}><AppLoading /></td> ) : (
              <>
                { !services.length ? ( <td colSpan={6}><AppEmptyResponse /></td> ) : (
                  <>
                    {services.map((item) => (
                      <tr key={item.id}>
                        <td className="p-3">{item.name}</td>
                        <td className="p-3">{item.description}</td>
                        <td className="p-3 text-right">${Intl.NumberFormat().format(item.price ?? 0)}</td>
                        <td className="p-3 text-right">${Intl.NumberFormat().format(item.advancePayment ?? 0)}</td>
                        <td className="p-3 text-center">{item.status}</td>

                        <td>
                          <div className="join">
                            <button className="btn btn-sm join-item btn-outline btn-neutral" onClick={ () => openDeleteModal(item) }>
                              Eliminar
                            </button>

                            <button className="btn btn-sm join-item btn-outline btn-neutral" onClick={ () => openFormModal(item) }>
                              Editar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>

      <AppModal isOpen={ formModal } onClose={ closeModalForm }>
        <ServiceForm data={ service } onClose={ closeModalForm } />
      </AppModal>

      <AppModal isOpen={ deleteModal } onClose={ closeDeleteModal }>
        <AppConfirmDeleteModal onClose={ closeDeleteModal } />
      </AppModal>
    </>
  );
}